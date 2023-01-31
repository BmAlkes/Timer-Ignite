import React from 'react'
import { HistoryContainer, HistoryList, Status } from './styles'

export const History = () => {
  return (
    <HistoryContainer>
      <h2>My Historic</h2>
      <HistoryList>
        <table>
          <thead>
            <th>Task</th>
            <th>Start</th>
            <th>Status</th>
            <th>Duration</th>
          </thead>
          <tbody>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td> 2months ago </td>
              <td>
                <Status statusColor="green">concluded</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td> 2months ago </td>
              <td>
                <Status statusColor="green">concluded</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td> 2months ago </td>

              <td>
                <Status statusColor="green">concluded</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td> 2months ago </td>
              <td>
                <Status statusColor="green">concluded</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td> 2months ago </td>
              <td>
                <Status statusColor="green">concluded</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td> 2months ago </td>
              <td>
                <Status statusColor="red">concluded</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
