import requests
import json
import datetime
from typing import Tuple, List
from pprint import PrettyPrinter
pp = PrettyPrinter()

def get_information_about_sports():
    sports_url = "https://asvz.ch/asvz_api/sport_search?_format=json&limit=999"
    sports_json = json.loads(requests.get(sports_url).content)
    sports_results = sports_json['results']
    # pp.pprint(sportsj)

    sport_title2nid = {sports_results[i]['title'] : sports_results[i]['nid'] for i in range(len(sports_results))}
    # pp.pprint(sport_title2nid)

    sport_nid2title = {val : key for key, val in sport_title2nid.items()}
    # pp.pprint(sport_nid2title)

    assert len(sport_nid2title) == len(sport_title2nid) # Assert that the mapping is one to one

    # print(sports_json.keys()) # counts, facets, results, state
    for k in filter(lambda k: k != 'results', sports_json.keys()):
        print(k)
        pp.pprint(sports_json[k])
    assert sports_json['count']['limit'] >= sports_json['count']['total'] and sports_json['count']['offset'] == 0 # Make sure that we got all the sports

    # print(sports_json['state'])

    # NOTE Results and Facets are the only things we care about

    print([facet['id'] for facet in sports_json['facets']])
    # ['labels', 'sport_facility']
    #  {'id': 'sport_facility',
    #   'label': 'Anlagen',
    #   'terms': [{'count': 67,
    #              'facetId': 'sport_facility',
    #              'label': 'Sport Center Hönggerberg',
    #              'queryId': 'sport_facility:45598',
    #              'sid': 'f_sport_facility',
    #              'tid': '45598'},

    # queryId seems to be `sid no f` + tid
    # tid seems to be the building id
    pass

def get_information_about_events():
    # 2000 is a heuristic since we want to try and make sure we get all the events
    events_url = 'https://www.asvz.ch/asvz_api/event_search?_format=json&limit=2000&offset=0'
    events_json = json.loads(requests.get(events_url).content)
    print(events_json.keys())
    print(events_json['count'])
    events_results = events_json['results']

    # We can use the offset thing to get all the events
    # pp.pprint(events_json['facets'])
    # print([facet['id'] for facet in events_json['facets']])
    # Facets are ['beginner_friendly', 'facility', 'facility_type', 'general_type', 'instructor', 'label', 'niveau', 'period', 'sport', 'type', 'weekday']
    #  {'id': 'weekday',
    # 'label': 'Wochentag',
    # 'terms': [{'count': 3194,
    #             'facetId': 'weekday',
    #             'label': 'Montag',
    #             'queryId': 'weekday:3999',
    #             'sid': 'f_weekday',
    #             'tid': '3999'},
    # pp.pprint(events_results)
    # Example of Event
    # {
    # FACET 'beginner_friendly': True,
    #
    #       'cancelled': False,
    #       'event_type': ['3997'],
    #       'event_type_name': 'Lektion',
    #
    # FACET 'facility': ['45613'],
    #       'facility_name': ['Wädenswil Kraft-/Cardio-Center'],
    #
    # FACET 'facility_type': ['110'],
    #       'facility_type_name': ['Kraft-/Cardio Center'],
    #
    #       'facility_url': ['/anlage/45613-waedenswil-kraft-cardio-center'],
    #       'from_date': '2022-10-21T12:00:00Z',
    #       'from_date_key': '20221021',
    #       'from_date_stamp': 1666353600,
    #
    # FACET 'general_type': ['29'],
    #       'general_type_name': 'Lektionen',
    #
    # 'livestream': False,
    # 'location': 'Wädenswil Kraft-/Cardio-Center',
    # 'nid': 443085, - probably the id of the specific event
    # 'niveau_name': 'Alle',
    # 'niveau_short_name': 'Alle',
    #
    # 'oe_enabled': True,
    # 'oe_from_date': '2022-10-20T12:00:00Z',
    # 'oe_from_date_key': '20221020',
    # 'oe_from_date_stamp': 1666267200,
    # 'oe_to_date': '2022-10-21T14:30:00Z',
    # 'oe_to_date_key': '20221021',
    # 'oe_to_date_stamp': 1666362600,
    #
    # 'places_max': 5,
    #
    # 'searchable': False,
    # FACET 'sport': ['439761'],
    #       'sport_name': 'Freies Sporttreiben',
    #
    # 'title': 'Individuelle Nutzung (ohne Fitness)',
    #
    # 'to_date': '2022-10-21T15:30:00Z',
    # 'to_date_key': '20221021',
    # 'to_date_stamp': 1666366200,
    # 'type': 'lesson',
    #
    # 'url': 'https://schalter.asvz.ch/tn/lessons/356874'
    # }
    # pp.pprint(events_results)
    pass

def sanity_test_mapping():
    # sports_url = "https://asvz.ch/asvz_api/sport_search?_format=json&limit=999"
    events_url = 'https://www.asvz.ch/asvz_api/event_search?_format=json&limit=2000&offset=0'
    events_json = json.loads(requests.get(events_url).content)
    # sports_json = json.loads(requests.get(sports_url).content)
    events_json['facets']
    # print(events_json['count'])

    nids = [event['nid'] for event in events_json['results']]
    assert len(nids) == len(set(nids)) == min(events_json['count']['limit'], events_json['count']['total'] - events_json['count']['offset'])


    pass
# Be able to filter by
# 1. Sport preference
# 2. Location Preference
# 3. Open Times
# 4. Integrate Google Calendar API to be able to know the open times
class EventsFilter:
    def __init__(self):
        self.sports = []
        self.free_times: List[Tuple[datetime.datetime, datetime.datetime]] = []

if __name__ == '__main__':
    # get_information_about_sports()
    # get_information_about_events()
    sanity_test_mapping()