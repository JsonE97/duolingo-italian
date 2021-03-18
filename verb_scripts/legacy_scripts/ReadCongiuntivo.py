import requests
import urllib.request
import time
from bs4 import BeautifulSoup
import json

GENERIC_URL = "https://www.italian-verbs.com/?lemma="

names = ["PRESENTE",
         "PASSATO",
         "IMPERFETTO",
         "TRAPASSATO"
         ]


def read_file(file):
    with open(file, "r") as f:
        lines = f.readlines()

    new_l = []
    for l in lines:
        new_l.append(l.strip('\n').replace('\t', ','))
    return new_l


def read_html(verb):
    num = 200 if verb == 'AVERE' else 100
    response = requests.get(GENERIC_URL+"{0}{1}".format(verb, num))
    zuppa = str(BeautifulSoup(response.text, "html.parser"))
    zuppa.split('\n')

    indexes = [
        zuppa.find("CONGIUNTIVO"),
        zuppa.find("CONDIZIONALE")
    ]

    new_zuppa = zuppa[indexes[0]:indexes[-1]]
    lists = new_zuppa.split('\n')
    return lists


def parse_items(lists, token):
    tense = []
    for entry in lists:
        if entry.find(token) != -1:
            index = lists.index(entry)
            if index != -1:
                tense = lists[index+1:index+7]
                break

    new_tense = []
    for t in tense:
        new_tense.append(t[t.find("100%")+6:t.find("/td")-1])
    return new_tense


if __name__ == "__main__":

    verb_list = list(map(lambda it: it.split(","), read_file("verbs.csv")))

    verbs = {
        "PRESENTE": {},
        "PASSATO": {},
        "IMPERFETTO": {},
        "TRAPASSATO": {}
    }

    #f = open("translations.csv", "w")
    for v in verb_list:
        print("reading verb {0}".format(v[1]))
        html_lists = read_html(v[1].upper())
        for n in names:
            final_entries = []
            final_string = ""
            final_items = parse_items(html_lists, n)
            final_entry = v[0] + "," + v[1] + ","
            final_entries.append(final_entry + ",".join(final_items))
            verbs[n][v[1].upper()] = (final_entry + ",".join(final_items))
            final_string = "\n".join(final_entries)

        #f.write("\n{0} Tense:\n".format(n))
        # f.write(final_string)

    # f.close()
    for k in verbs.keys():
        print(len(verbs[k]))

    with open("congiuntivo.json", "w") as f:
        json.dump(verbs, f)
