import React, { useContext } from 'react'
import { CycleContext } from '../../context/CycleContext'
import { HistoryContainer, HistoryList, Status } from './styles'
import { formatDistanceToNow } from 'date-fns'

export const History = () => {
  const { cycles } = useContext(CycleContext)

  return (
    <HistoryContainer>
      <h2>My Historic</h2>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Start</th>
              <th>Status</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount}</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, { addSuffix: true })}
                  </td>
                  <td>
                    {cycle.finishDate && (
                      <Status statusColor="green">Concluded</Status>
                    )}
                    {cycle.interrupedDate && (
                      <Status statusColor="red">Interruped</Status>
                    )}
                    {!cycle.finishDate && !cycle.interrupedDate && (
                      <Status statusColor="yellow">processing</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
