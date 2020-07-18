from nltk import word_tokenize, pos_tag
import string
from googletrans import Translator

translator = Translator()


def obtain_nouns_verbs(text):
    translation = translator.translate(text, src="it", dest="en")
    text = translation.text
    eng_nouns, eng_verbs = [], []
    it_nouns, it_verbs = [], []
    tokens = word_tokenize(text)
    pos_tags = pos_tag(tokens)
    for it in pos_tags:
        if it[1] == 'NN' or it[1] == 'NNS':
            eng_nouns.append(it[0])
        elif 'VB' in it[1]:
            eng_verbs.append(it[0])
    nouns = apply_translations(eng_nouns, "en", "it")
    verbs = apply_translations(eng_verbs, "en", "it")
    return {"nouns": nouns, "verbs": verbs}


def obtain_nouns_verbs_new(text):
    it_nouns, it_verbs = {}, {}
    tokens = text.lower().translate(str.maketrans(
        '', '', string.punctuation)).split(" ")

    for token in tokens:
        eng_trans = translator.translate(
            token, src="it", dest="en").text.lower()
        token_tag = word_tokenize(eng_trans)
        pos_tag_obj = pos_tag(token_tag)[0]

        if pos_tag_obj[1] == 'NN' or pos_tag_obj[1] == 'NNS':
            it_nouns = append_token(it_nouns, token, eng_trans)
        elif 'VB' in pos_tag_obj[1]:
            it_verbs = append_token(it_verbs, token, eng_trans)

    return {"it_nouns": it_nouns, "it_verbs": it_verbs}


def append_token(dict, token, value):
    if token not in dict.keys():
        dict[token] = [value]
    else:
        if value not in dict[token]:
            dict[token].append(value)
    return dict


def apply_translations(tokens, incoming_lang, outgoing_lang):
    translations = {}
    translation = translator.translate(
        tokens, src=incoming_lang, dest=outgoing_lang)
    for t in range(len(translation)):
        if tokens[t].upper() not in translations.keys():
            translations[tokens[t].upper()] = translation[t].text
    return translations


if __name__ == "__main__":
    #print(obtain_nouns_verbs("when i want to eat a sandwich, i will do it"))

    print(obtain_nouns_verbs_new("sei stato impegnato"))
