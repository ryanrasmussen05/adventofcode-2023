export async function getInput(path) {
  return fetch(path)
    .then(response => response.text())
    .then(text => text.trim())
    .then(text => text.split('\n'))
}

export async function getInputNoTrim(path) {
  return fetch(path)
    .then(response => response.text())
    .then(text => text.split('\n'))
}