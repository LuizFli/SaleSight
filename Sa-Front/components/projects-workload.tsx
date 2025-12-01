import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function ProjectsWorkload() {
  const teamMembers = ["Sam", "Mandy", "Kim", "Dmitry", "Viago", "Kadin", "Matin"]

  // Gera dados de carga de trabalho (5 semanas x 7 membros)
  const workloadData = [
    [2, 0, 0, 0, 0, 0, 1], // Semana 1
    [0, 0, 0, 0, 0, 1, 0], // Semana 2
    [0, 1, 0, 0, 0, 0, 2], // Semana 3
    [0, 0, 0, 0, 0, 0, 0], // Semana 4
    [0, 0, 0, 0, 0, 1, 0], // Semana 5
  ]

  return (
    <Card className="bg-white border-none shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Projects Workload</CardTitle>
          <Button variant="outline" size="sm" className="text-xs h-8 bg-transparent">
            Last 3 months
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Dot matrix */}
          <div className="flex justify-between items-end h-32">
            {teamMembers.map((member, memberIndex) => (
              <div key={memberIndex} className="flex flex-col items-center gap-1">
                {workloadData.map((week, weekIndex) => {
                  const count = week[memberIndex]
                  return (
                    <div
                      key={weekIndex}
                      className={`w-5 h-5 rounded-full border-2 ${
                        count === 0
                          ? "border-gray-300 bg-white"
                          : count === 1
                            ? "border-gray-800 bg-gray-800"
                            : "border-gray-800 bg-gray-800"
                      }`}
                    >
                      {count > 1 && (
                        <div className="w-full h-full flex items-center justify-center text-[8px] text-white font-bold">
                          {count}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Team member names */}
          <div className="flex justify-between">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-[10px] text-gray-600 text-center w-5">
                {member}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
