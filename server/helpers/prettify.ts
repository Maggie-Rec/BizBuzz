export default function prettify(input: string) {
  return input.replace(/[^a-zA-Z0-9]/g, '');
}
