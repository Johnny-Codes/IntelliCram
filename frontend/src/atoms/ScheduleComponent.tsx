import { useState, useEffect } from 'react';
import { useCreateLearningPlanMutation } from '@/queries/learning_plan';

let response = {
  "topic": "Texas History Learning Plan",
  "schedule": [
    {
      "week 1": {
        "day 1": {
          "tasks": ["Introduction to Texas geography and native peoples"]
        },
        "day 2": {
          "tasks": ["Spanish Texas, including exploration and missions"]
        },
        "day 3": {
          "tasks": ["Mexican Texas, the fight for independence, and the Texas Revolution"]
        },
        "day 4": {
          "tasks": ["Republic of Texas and annexation to the United States"]
        },
        "day 5": {
          "tasks": ["The Civil War and Reconstruction in Texas"]
        },
        "day 6-7": {
          "tasks": ["Review Week 1 topics and take a comprehensive quiz"]
        }
      }
    },
    {
      "week 2": {
        "day 1": {
          "tasks": ["Post-Reconstruction era and the rise of cattle ranching"]
        },
        "day 2": {
          "tasks": ["The impact of oil discoveries and the growth of the Texas economy"]
        },
        "day 3": {
          "tasks": ["Texas in the early 20th century, including the Great Depression and World War II"]
        },
        "day 4": {
          "tasks": ["Civil rights movement and desegregation in Texas"]
        },
        "day 5": {
          "tasks": ["Modern Texas, including the rise of technology and the diversity of the state"]
        },
        "day 6-7": {
          "tasks": ["Review Week 2 topics and work on a project summarizing the major historical events in Texas"]
        }
      }
    },
    {
      "week 3": {
        "day 1": {
          "tasks": ["Present the project summarizing the major historical events in Texas"]
        },
        "day 2": {
          "tasks": ["Explore modern issues in Texas, such as immigration, border security, and environmental concerns"]
        },
        "day 3": {
          "tasks": ["Texas government and the role of Texas in the United States political landscape"]
        },
        "day 4": {
          "tasks": ["Texas culture, including food, music, and traditions"]
        },
        "day 5": {
          "tasks": ["The future of Texas and its potential impact on the United States"]
        },
        "day 6-7": {
          "tasks": ["Review Week 3 topics and prepare for a final assessment or assignment"]
        }
      }
    }
  ]
}





const UserLearningPlanForm = () => {
  const [formData, setFormData] = useState({})
  const [createLearningPlan, createLearningPlanResponse] = useCreateLearningPlanMutation()
  

  useEffect(() => {
    if (createLearningPlanResponse.isSuccess) {
      console.log('success', createLearningPlanResponse.data)
      response = createLearningPlanResponse.data; // Update response with the received data
    }
  }, [createLearningPlanResponse])

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitting', formData)
    createLearningPlan(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="topic" type="text" placeholder="Topic" onChange={handleFormChange} />
      <input name="time_to_study"type="text" placeholder="How long" onChange={handleFormChange} />
      <button type="submit">Submit</button>
    </form>
  )
}

const ScheduleComponent = () => {
  
  return (
    <>
      <UserLearningPlanForm />
      <div className="p-8 text-5xl text-center">
        <h1>{response.topic}</h1>
      </div>
      {response.schedule.map((week, weekIndex) => (
        <div key={weekIndex} className="">
          <h2 className="text-2xl font-bold p-8 bg-slate-400 text-center border-b-2 border-gray-500 pb-2">
            {"Week " + (weekIndex + 1)}
          </h2>
          {Object.keys(week).map((day, dayIndex) => (
            <div key={dayIndex} className="flex flex-wrap py-4 border-b bg-slate-300 border-gray-500 text-center">
              <div className="grid md:grid-cols-6 sm:grid-cols-2 gap-4 p-4">
                {Object.keys(week[day]).map((timePeriod, timeIndex) => (
                  <div key={timeIndex} className="col-span-1 text-left">
                    <h4 className="text-md font-medium p-4 bg-slate-200">{timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}</h4>
                    <ul>
                      {week[day][timePeriod].tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="p-1 bg-white">{task}</li>
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