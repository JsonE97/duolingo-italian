import requests
import urllib.request
import time
from bs4 import BeautifulSoup
import json

GENERIC_URL = "https://www.italian-verbs.com/?lemma="

names = ["PRESENTE", #CONDIZIONALE
         "PASSATO", #CONDIZIONALE
         "PRESENTE", #IMPERATIVO
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
        zuppa.find("CONDIZIONALE"),
        zuppa.find("IMPERATIVO"),
        zuppa.find("INFINITO"),
        zuppa.find("PARTICIPIO"),
        zuppa.find("GERUNDIO")
    ]

    new_zuppa = zuppa[indexes[0]:indexes[-1]]
    lists = new_zuppa.split('\n')
    return lists


def findCondizionale(lists, token):
    presente = []
    passato = []
    for entry in lists:
        if entry.find('Presente') != -1:
            index = lists.index(entry)
            if index != -1:
                presente = lists[index+1:index+7]
                break
    for entry in lists:
        if entry.find('Passato') != -1:
            index = lists.index(entry)
            if index != -1:
                passato = lists[index+1:index+7]
                break
    return presente, passato

def parse_items(lists, token):
    if token == "CONDIZIONALE":
        presente, passato = findCondizionale(lists, token)
        new_presente = []
        new_passato = []
        for t in presente:
            new_presente.append(t[t.find("100%")+6:t.find("/td")-1])
        for t in passato:
            new_passato.append(t[t.find("100%")+6:t.find("/td")-1])
        return new_presente, new_passato

if __name__ == "__main__":

    verb_list = list(map(lambda it: it.split(","), read_file("verbs.csv")))

    MOODS = {
        "CONDIZIONALE": {},
        "IMPERATIVO": {},
        "INFINITO": {},
        "PARTICIPIO": {},
        "GERUNDIO": {}
    }

    for v in verb_list:
        print("reading verb {0}".format(v[1]))
        html_lists = read_html(v[1].upper())

        condizionale_pres = []
        condizionale_pas = []
        final_cond_pres = ""
        final_cond_pas = ""
        cond_pres, cond_pas = parse_items(html_lists, "CONDIZIONALE")

        condizionale_pres.append(",".join(cond_pres))
        condizionale_pas.append(",".join(cond_pas))

        #cond presente
        if "PRESENTE" not in MOODS["CONDIZIONALE"].keys():
            MOODS["CONDIZIONALE"]["PRESENTE"] = {v[1].upper() : "{0},".format(",".join(v)) + ",".join(condizionale_pres)}
        else:
            MOODS["CONDIZIONALE"]["PRESENTE"][v[1].upper()] = ("{0},".format(",".join(v)) + ",".join(condizionale_pres))
            #final_string_pres = "\n".join(final_cond_pres)

        #cond passato
        if "PASSATO" not in MOODS["CONDIZIONALE"].keys():
            MOODS["CONDIZIONALE"]["PASSATO"] = {v[1].upper() : ("{0},".format(",".join(v)) + ",".join(condizionale_pas))}
        else:
            MOODS["CONDIZIONALE"]["PASSATO"][v[1].upper()] = ("{0},".format(",".join(v)) + ",".join(condizionale_pas))
            #final_string = "\n".join(final_cond_pas)



    with open("condizionale.json", "w") as f:
        json.dump(MOODS, f)
