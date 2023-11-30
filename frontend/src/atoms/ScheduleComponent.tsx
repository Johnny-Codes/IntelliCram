const ScheduleComponent = () => {
    const schedule = {
      "topic": "Music Theory Learning Plan",
      "schedule": [
        {
          "week 1": {
            "day 1": {
              "tasks": ["Introduction to basics of music notation"]
            },
            "day 2": {
              "tasks": ["Understanding the elements of rhythm and time signatures"]
            },
            "day 3": {
              "tasks": ["Exploring basic intervals and scales"]
            },
            "day 4": {
              "tasks": ["Learning about key signatures and the Circle of Fifths"]
            },
            "day 5": {
              "tasks": ["Introduction to chords and chord progressions"]
            },
            "day 6-7": {
              "tasks": ["Review and practice of the week's topics"]
            }
          }
        },
        {
          "week 2": {
            "day 1": {
              "tasks": ["Understanding diatonic harmony and the major scale"]
            },
            "day 2": {
              "tasks": ["Learning about minor scales and their harmonic relationships"]
            },
            "day 3": {
              "tasks": ["Exploring chord construction and inversions"]
            },
            "day 4": {
              "tasks": ["Introduction to cadences and their functions"]
            },
            "day 5": {
              "tasks": ["Understanding basic voice leading principles"]
            },
            "day 6-7": {
              "tasks": ["Review and practice of the week's topics"]
            }
          }
        },
        {
          "week 3": {
            "day 1": {
              "tasks": ["Learning about non-diatonic chords and progressions"]
            },
            "day 2": {
              "tasks": ["Exploring functional harmony and chord substitutions"]
            },
            "day 3": {
              "tasks": ["Understanding modal interchange and borrowed chords"]
            },
            "day 4": {
              "tasks": ["Introduction to melodic and harmonic analysis"]
            },
            "day 5": {
              "tasks": ["Exploring phrase structure and form in music"]
            },
            "day 6-7": {
              "tasks": ["Review and practice of the week's topics"]
            }
          }
        },
        {
          "week 4": {
            "day 1": {
              "tasks": ["Understanding basic counterpoint principles"]
            },
            "day 2": {
              "tasks": ["Exploring species counterpoint exercises"]
            },
            "day 3": {
              "tasks": ["Introduction to 4-part chorale writing"]
            },
            "day 4": {
              "tasks": ["Learning about contrapuntal techniques and devices"]
            },
            "day 5": {
              "tasks": ["Analyzing contrapuntal works and compositions"]
            },
            "day 6-7": {
              "tasks": ["Review and practice of the week's topics"]
            }
          }
        },
        {
          "week 5": {
            "day 1": {
              "tasks": ["Understanding basic elements of rhythm and meter"]
            },
            "day 2": {
              "tasks": ["Exploring advanced rhythmic concepts and polyrhythms"]
            },
            "day 3": {
              "tasks": ["Learning about syncopation and irregular meters"]
            },
            "day 4": {
              "tasks": ["Introduction to rhythmic notation and analysis"]
            },
            "day 5": {
              "tasks": ["Understanding rhythmic patterns and motifs"]
            },
            "day 6-7": {
              "tasks": ["Review and practice of the week's topics"]
            }
          }
        },
        {
          "week 6": {
            "day 1": {
              "tasks": ["Exploring advanced melodic construction and development"]
            },
            "day 2": {
              "tasks": ["Understanding harmonic progression and modulation"]
            },
            "day 3": {
              "tasks": ["Learning about advanced voice leading and part writing"]
            },
            "day 4": {
              "tasks": ["Introduction to extended and altered harmonies"]
            },
            "day 5": {
              "tasks": ["Exploring techniques for composition and arranging"]
            },
            "day 6-7": {
              "tasks": ["Review and practice of the week's topics"]
            }
          }
        },
        {
          "week 7": {
            "day 1": {
              "tasks": ["Understanding the principles of form and structure in music"]
            },
            "day 2": {
              "tasks": ["Exploring different musical forms and their characteristics"]
            },
            "day 3": {
              "tasks": ["Learning about thematic development and variation"]
            },
            "day 4": {
              "tasks": ["Introduction to analysis of musical form and structure"]
            },
            "day 5": {
              "tasks": ["Understanding the relationship between text and music"]
            },
            "day 6-7": {
              "tasks": ["Review and practice of the week's topics"]
            }
          }
        },
        {
          "week 8": {
            "day 1": {
              "tasks": ["Integration and application of all previously covered topics"]
            },
            "day 2": {
              "tasks": ["Final review and assessment preparation"]
            },
            "day 3": {
              "tasks": ["Practice exams and performance assessments"]
            },
            "day 4": {
              "tasks": ["Reinforcement of weaker areas and individual study"]
            },
            "day 5": {
              "tasks": ["Final assessment and evaluation"]
            },
            "day 6-7": {
              "tasks": ["Celebration and reflection on the learning journey"]
            }
          }
        }
      ]
    }

    return (
      <>
        <div className="p-8 text-5xl text-center">
        <h1>{schedule.topic}</h1>
        </div>
        {schedule.schedule.map((week, weekIndex) => (
          <div key={weekIndex} className="">
            <h2 className="text-2xl font-bold p-8 bg-slate-400 text-center border-b-2 border-gray-500 pb-2">
              {`Week ${weekIndex + 1}`}
            </h2>
            {Object.keys(week).map((day, dayIndex) => (
              <div key={dayIndex} className="py-4 border-b bg-slate-300 border-gray-500 text-center">
                <div className="grid grid-cols-6 gap-4 p-4">
                  {Object.keys(week[day]).map((timePeriod, timeIndex) => (
                    <div key={timeIndex} className="col-span-1 text-left">
                      <h4 className="text-md font-medium p-4 bg-slate-200">{timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}</h4>
                      <ul>
                        {week[day][timePeriod].tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="p-1 bg-white">{task.charAt(0).toUpperCase() + task.slice(1)}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </>
    );
  };
    


export default ScheduleComponent;