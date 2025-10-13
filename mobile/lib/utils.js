export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-br', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
