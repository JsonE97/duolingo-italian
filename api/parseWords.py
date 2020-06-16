from nltk import word_tokenize, pos_tag
from googletrans import Translator

translator = Translator()


def obtain_nouns_verbs(text):
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


def apply_translations(tokens, incoming_lang, outgoing_lang):
    translations = {}
    translation = translator.translate(
        tokens, src=incoming_lang, dest=outgoing_lang)
    for t in range(len(translation)):
        if tokens[t].upper() not in translations.keys():
            translations[tokens[t].upper()] = translation[t].text
    return translations


if __name__ == "__main__":
    print(obtain_nouns_verbs("when i want to eat a sandwich, i will do it"))
