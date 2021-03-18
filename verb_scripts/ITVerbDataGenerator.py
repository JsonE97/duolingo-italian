# import json
# import pyttsx3
# import time
# import random


# IT_VOICE = "com.apple.speech.synthesis.voice.luca"
# EN_VOICE = "com.apple.speech.synthesis.voice.daniel.premium"
# person_array = ["I", "You", "He", "She", "It", "We", "You all", "They"]


# def read_verbs():
#     with open("indicativo.json") as f:
#         data = json.load(f)

#     presente = data["PASSATO REMOTO"]
#     return presente


# def parse_verbs(presente):
#     eng_verbs = []
#     it_verbs = []
#     for entry in presente.keys():
#         line = presente[entry].split(",")
#         eng_verbs.append(line[0])
#         it_verbs.append(line[1])
#     return eng_verbs, it_verbs


# def create_engine():
#     engine = pyttsx3.init()
#     engine.setProperty('voice', IT_VOICE)
#     return engine


# def create_sentence(index, presente):
#     entry = presente[list(presente.keys())[index]]
#     entry = entry.split(",")
#     e.say(it_verbs[index])
#     e.runAndWait()

#     e.setProperty('voice', EN_VOICE)
#     e.say("to " + eng_verbs[index])
#     e.runAndWait()
#     e.setProperty('voice', IT_VOICE)

#     for i in range(2 , len(entry)):
#         e.say(entry[i])
#         e.runAndWait()


# def n_random(presente):
#     while True:
#         ints = [int(random.uniform(0, 84)), int(random.uniform(0, 84)), int(random.uniform(0, 84))]
#         for i in ints:
#             create_sentence(i, presente)
#             time.sleep(3)


# if __name__ == "__main__":
#     verbs = read_verbs()
#     eng_verbs, it_verbs = parse_verbs(verbs)
#     e = create_engine()
#     n_random(verbs)


#############################################################################
# LEGACY CODE ABOVE
#############################################################################

import json
import mlconjug3


class ItalianVerbKeys:
        MOOD_INDICATIVO = "Indicativo"
        MOOD_CONGIUNTIVO = "Congiuntivo"
        MOOD_CONDIZIONALE = "Condizionale"
        MOOD_IMPERATIVO = "Imperativo"
        MOOD_INFINITO = "Infinito"
        MOOD_PARTICIPIO = "Participio"
class ITVerbDataGenerator:
    def __init__(self, inFileName, outFileName):
        self.fileName = inFileName
        self.outFileName = outFileName
        self.resultDict = {}
        self.conjugator = mlconjug3.Conjugator(language='it')
        self.readFile()
        self.outputToFile()

    def readFile(self):
        with open(self.fileName) as inFile:
            data = json.load(inFile)
            for (k, v) in data.items():
                slashPos = v.find('/')
                subString = v[:slashPos] if slashPos != -1 else v
                try:
                    conjug = self.conjugator.conjugate(subString, "pronoun")
                    test = conjug.conjug_info["Indicativo"]
                    self.exportData(k, conjug.conjug_info)
                except:
                    print("verb not found - " + subString)

    def exportData(self, engVerb, verbData):
        resVerbData = {}
        for verbMood in verbData.keys():
            moodTenseData = {}
            for moodTense in verbData[verbMood].keys():
                curTenseData = {}
                for person in verbData[verbMood][moodTense].keys():
                    curTenseData[person] = verbData[verbMood][moodTense][person]
                moodTenseData[moodTense] = curTenseData
            resVerbData[verbMood] = moodTenseData
        self.resultDict[engVerb] = resVerbData

    def outputToFile(self):
        with open(self.outFileName, "w") as f:
            f.write(json.dumps(self.resultDict))

ITVerbDataGenerator("./verb_scripts/1000verbs.json",
                    "./verb_scripts/italianVerbData.json")
