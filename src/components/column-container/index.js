import * as Column from '../column/index.js'

export function template({ columns }) {
  return `
    <main class="columns surface-alt">
        ${columns.map((column) => Column.template({ column })).join('')}
    </main>
    `
}
export function render(parent) {
  // FIXME
  // 초기 데이터 넣어주기
  // localStorage에서 불러오기
  parent.insertAdjacentHTML('beforeend', template({ columns: mockData }))
}

const mockData = [
  { id: 1, columnName: '해야할 일', cards: [] },
  { id: 2, columnName: '하고 있는 일', cards: [] },
  { id: 3, columnName: '완료한 일', cards: [] },
]
