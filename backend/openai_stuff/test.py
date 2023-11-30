response = {
  "Month 1": {
    "Week 1": {
      "Day 1": {
        "tasks": [
          "Introduction to vectors and vector operations"
        ]
      },
      "Day 2": {
        "tasks": [
          "Vector spaces and subspaces"
        ]
      },
      "Day 3": {
        "tasks": [
          "Linear independence and spanning sets"
        ]
      },
      "Day 4": {
        "tasks": [
          "Basis and dimension"
        ]
      },
      "Day 5": {
        "tasks": [
          "Linear transformations"
        ]
      },
      "Day 6-7": {
        "tasks": [
          "Review and practice problems"
        ]
      }
    },
    "Week 2": {
      "Day 1": {
        "tasks": [
          "Matrix operations"
        ]
      },
      "Day 2": {
        "tasks": [
          "Matrix inverses and determinants"
        ]
      },
      "Day 3": {
        "tasks": [
          "Eigenvalues and eigenvectors"
        ]
      },
      "Day 4": {
        "tasks": [
          "Diagonalization"
        ]
      },
      "Day 5": {
        "tasks": [
          "Orthogonalization and Gram-Schmidt process"
        ]
      },
      "Day 6-7": {
        "tasks": [
          "Review and practice problems"
        ]
      }
    },
    "Week 3-4": {
      "Day 1-7": {
        "tasks": [
          "Applications of linear algebra in machine learning and data analysis"
        ]
      }
    }
  },
  "Month 2": {
    "Week 5": {
      "Day 1": {
        "tasks": [
          "Systems of linear equations"
        ]
      },
      "Day 2": {
        "tasks": [
          "Gaussian elimination and matrix factorizations"
        ]
      },
      "Day 3": {
        "tasks": [
          "Vector spaces and linear transformations"
        ]
      },
      "Day 4": {
        "tasks": [
          "Matrix decompositions: Cholesky, QR and SVD"
        ]
      },
      "Day 5": {
        "tasks": [
          "Applications in computer graphics and cryptography"
        ]
      },
      "Day 6-7": {
        "tasks": [
          "Review and practice problems"
        ]
      }
    },
    "Week 6": {
      "Day 1": {
        "tasks": [
          "Linear programming and optimization"
        ]
      },
      "Day 2": {
        "tasks": [
          "Least squares problems"
        ]
      },
      "Day 3": {
        "tasks": [
          "Applications in control theory and signal processing"
        ]
      },
      "Day 4": {
        "tasks": [
          "Applications in network analysis and image processing"
        ]
      },
      "Day 5": {
        "tasks": [
          "Introduction to tensors and multilinear algebra"
        ]
      },
      "Day 6-7": {
        "tasks": [
          "Review and practice problems"
        ]
      }
    },
    "Week 7-8": {
      "Day 1-7": {
        "tasks": [
          "Project work or in-depth study of a specific application of linear algebra"
        ]
      }
    }
  }
}

for month in response:
    print(month)
    for week in response[month]:
        print("\t" + week)
        for day in response[month][week]:
            print("\t\t" + day)
            for task in response[month][week][day]["tasks"]:
                print("\t\t\t" + task)

print(response["Month 1"]["Week 1"]["Day 1"]["tasks"])