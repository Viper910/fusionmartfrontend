export default function MessageBox(props) {
  return (
    <div className={`alert alert-${props.variant || 'danger'}`} role="alert">
      {props.children}
    </div>
  );
}
