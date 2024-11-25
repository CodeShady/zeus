
export function formatNewlines(str) {
  return str.split('\n').map((item, index) => (
    <span key={index}>
      {item}
      {index < str.split('\n').length - 1 && <br />}
    </span>
  ));
}
