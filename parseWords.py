import spacy
from nltk import word_tokenize, pos_tag
import string
from google_trans_new import google_translator as Translator

translator = Translator()

# Obtain Nouns and Verbs from text - method 1

# obtain_nouns_verbs
# Description - traverses the text passed in and gather a dictionary of verbs and one of nouns
# Args        - text - the text to be parsed
# Returns     - an object in the form {"nouns": <nouns dict>, "verbs": <verbs dict>}


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

# apply_translations
# Description - takes a list of tokens in the incoming language and translates them to the outgoing lang
# Args        - tokens          - list of tokens in one language
#             - incoming_lang   - the language of the tokens in the list
#             - outgoing_lang   - the language to be converted into


def apply_translations(tokens, incoming_lang, outgoing_lang):
    translations = {}
    translation = translator.translate(
        tokens, src=incoming_lang, dest=outgoing_lang)
    for t in range(len(translation)):
        if tokens[t].upper() not in translations.keys():
            translations[tokens[t].upper()] = translation[t].text
    return translations

# Obtain Nouns and Verbs from text - method 2
# obtain_italian_token_translations
# Description - traverses the text passed in and gather a dictionary of italian token translations
# Args        - text - the text in italian to be translated
# Returns     - an object in the form {"it_tokens": <it token translation dict>}


def obtain_italian_token_translations(text):
    it_tokens = {}
    tokens = text.lower().translate(str.maketrans(
        '', '', string.punctuation)).split(" ")

    for token in tokens:
        eng_trans = translator.translate(
            token, src="it", dest="en").text.lower()
        token_tag = word_tokenize(eng_trans)
        pos_tag_obj = pos_tag(token_tag)[0]

        if pos_tag_obj[1] == 'NN' or pos_tag_obj[1] == 'NNS' or 'VB' in pos_tag_obj[1]:
            it_tokens = append_token(it_tokens, token, eng_trans)

    return {"it_tokens": it_tokens}

# append_token
# Description - helper function to append key and value translation to dictionary
# Args        - dict  - the dictionary
#             - token - the token key to append
#             - value - the value for the key to append


def append_token(dict, token, value):
    if token not in dict.keys():
        dict[token] = [value]
    else:
        if value not in dict[token]:
            dict[token].append(value)
    return dict


# example usage

# if __name__ == "__main__":
#   print(obtain_italian_token_translations("devo giocare"))
#
#   print(obtain_nouns_verbs(
#         "devo giocare la partita perche sono un giocatore buonissimo"))


##########################################################################################
# SPACY API TEST
##########################################################################################


nlp = spacy.load('it_core_news_sm')

# example usage


def obtain_spacy_translations(text, incoming_lang="it", outgoing_lang="en"):
    nouns = {}
    verbs = {}

    tokenised_text = nlp(text)
    for token in tokenised_text:
        formattedToken = token.text.lower().strip()
        if token.pos_ == "NOUN" and formattedToken not in nouns.keys():
            conversion = translator.translate(
                formattedToken, lang_src=incoming_lang, lang_tgt=outgoing_lang)
            nouns[formattedToken] = conversion
        elif (token.pos_ == "VERB" or token.tag_.lower().startswith("v")) and formattedToken not in verbs.keys():
            infinitive = token.lemma_.lower().strip()
            conversion = translator.translate(
                infinitive, lang_src=incoming_lang, lang_tgt=outgoing_lang)
            verbs[infinitive] = conversion
    return {"nouns": nouns, "verbs": verbs}

# if __name__ == "__main__":
#     res = obtain_spacy_translations("mangiare")
#     print(res["nouns"])
#     print(res["verbs"])
