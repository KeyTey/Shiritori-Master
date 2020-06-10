from flask import Blueprint, request, abort
from flask_restful import Api, Resource
import re, random

api_blueprint = Blueprint('api', __name__, url_prefix = '/api')

converter = {
    'a': 'あ',
    'i': 'い',
    'u': 'う',
    'e': 'え',
    'o': 'お',
    'ka': 'か',
    'ki': 'き',
    'ku': 'く',
    'ke': 'け',
    'ko': 'こ',
    'sa': 'さ',
    'si': 'し',
    'su': 'す',
    'se': 'せ',
    'so': 'そ',
    'ta': 'た',
    'ti': 'ち',
    'tu': 'つ',
    'te': 'て',
    'to': 'と',
    'na': 'な',
    'ni': 'に',
    'nu': 'ぬ',
    'ne': 'ね',
    'no': 'の',
    'ha': 'は',
    'hi': 'ひ',
    'hu': 'ふ',
    'he': 'へ',
    'ho': 'ほ',
    'ma': 'ま',
    'mi': 'み',
    'mu': 'む',
    'me': 'め',
    'mo': 'も',
    'ya': 'や',
    'yu': 'ゆ',
    'yo': 'よ',
    'ra': 'ら',
    'ri': 'り',
    'ru': 'る',
    're': 'れ',
    'ro': 'ろ',
    'wa': 'わ',
    'wo': 'を',
    'nn': 'ん',
    'ga': 'が',
    'gi': 'ぎ',
    'gu': 'ぐ',
    'ge': 'げ',
    'go': 'ご',
    'za': 'ざ',
    'zi': 'じ',
    'ji': 'じ',
    'zu': 'ず',
    'ze': 'ぜ',
    'zo': 'ぞ',
    'da': 'だ',
    'di': 'ぢ',
    'du': 'づ',
    'de': 'で',
    'do': 'ど',
    'ba': 'ば',
    'bi': 'び',
    'bu': 'ぶ',
    'be': 'べ',
    'bo': 'ぼ',
    'pa': 'ぱ',
    'pi': 'ぴ',
    'pu': 'ぷ',
    'pe': 'ぺ',
    'po': 'ぽ',
    'vu': 'ゔ'
}

dict_path = 'dict.txt'
words = [word.strip() for word in open(dict_path).readlines()]

class Search(Resource):
    def get(self):
        initial = request.args.get('initial')
        length = request.args.get('length', type = int)
        if not (initial and length):
            abort(400)
        if re.match('^[a-z]+$', initial):
            initial = converter.get(initial, '')
        if not re.match('^[ぁ-んゔ]$', initial):
            abort(400)
        searched_words = [word for word in words if word[0] == initial and len(word) == length]
        random.shuffle(searched_words)
        return searched_words

api = Api(api_blueprint)
api.add_resource(Search, '/search')
