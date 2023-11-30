response = {
  "topic": "Music Theory Learning Plan",
  "schedule": [
    {
      "week 1": {
        "day 1": {
          "tasks": ["Introduction to music notation", "Learning the musical staff and clefs"]
        },
        "day 2": {
          "tasks": ["Understanding note values and rhythms"]
        },
        "day 3": {
          "tasks": ["Learning the major and minor scales", "Understanding intervals"]
        },
        "day 4": {
          "tasks": ["Identifying and building basic chords"]
        },
        "day 5": {
          "tasks": ["Introduction to chord progressions", "Understanding basic harmony"]
        },
        "day 6-7": {
          "tasks": ["Review Week 1 material", "Practice identifying notes on the staff and playing simple melodies on an instrument"]
        }
      }
    },
    {
      "week 2": {
        "day 1": {
          "tasks": ["Introduction to key signatures", "Learning about diatonic harmony"]
        },
        "day 2": {
          "tasks": ["Understanding rhythm and meter", "Identifying and building extended chords"]
        },
        "day 3": {
          "tasks": ["Learning about cadences and chord progressions"]
        },
        "day 4": {
          "tasks": ["Understanding musical form and structure", "Analysis of simple musical pieces"]
        },
        "day 5": {
          "tasks": ["Introduction to modes", "Harmonic and melodic minor scales"]
        },
        "day 6-7": {
          "tasks": ["Review Week 2 material", "Practice playing scales, chords, and simple pieces on an instrument"]
        }
      }
    },
    {
      "week 3": {
        "day 1": {
          "tasks": ["Introduction to counterpoint and voice leading"]
        },
        "day 2": {
          "tasks": ["Understanding chromatic harmony", "Analysis of more complex musical pieces"]
        },
        "day 3": {
          "tasks": ["Learning about musical ornamentation and embellishments"]
        },
        "day 4": {
          "tasks": ["Introduction to musical analysis techniques and part writing"]
        },
        "day 5": {
          "tasks": ["Review of all topics covered", "Practice analyzing and playing more complex musical pieces"]
        },
        "day 6-7": {
          "tasks": ["Final review and consolidation of knowledge", "Practical application of music theory in playing and composing"]
        }
      }
    }
  ]
}

# for month in response:
#     print(month)
#     for week in response[month]:
#         print("\t" + week)
#         for day in response[month][week]:
#             print("\t\t" + day)
#             for task in response[month][week][day]["tasks"]:
#                 print("\t\t\t" + task)

# print(response["Month 1"]["Week 1"]["Day 1"]["tasks"])

# class_name will create the class repo
class_name = response["topic"]

# for each task in tasks_list, make a deck
tasks_list = []
for month in response["schedule"]:
    for week in month:
        for day in month[week]:
            tasks_list.extend(month[week][day]["tasks"])


"""
Need to create a class with the class_name
Return the class_id
Loop over tasks_list to create decks with class_id
"""