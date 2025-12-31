export default function Form() {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const firstname = formData.get("firstname");
          console.log(firstname);
        }}
      >
        <input type="text" name="firstname" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
