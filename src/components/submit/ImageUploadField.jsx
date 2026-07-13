import Form from "react-bootstrap/Form";

export default function ImageUploadField({ value, onChange }) {
  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
      {value && (
        <img
          src={value}
          alt="Recipe preview"
          className="img-fluid rounded-3 mt-3"
          style={{ maxHeight: 160 }}
        />
      )}
    </div>
  );
}
