interface Payload {
  action: string
  label: Label
  number: number
  pull_request: object
}

interface Label {
  color: string
  default: boolean
  description: string
  id: number
  name: string
  node_id: string
  url: string
}
