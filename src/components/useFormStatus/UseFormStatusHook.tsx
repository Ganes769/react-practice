import { useFormStatus, useFormState } from "react-dom";

function Submit() {
  const { pending, data } = useFormStatus();
  console.log("data", data);
  return (
    <>
      <button type="submit" disabled={pending}>
        {pending ? "Submitting" : "Success"}
      </button>
    </>
  );
}
export default function UseFormStatusHook() {
  const formAction = async (prevState: string | null, formdata: FormData) => {
    const name = formdata.get("name");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(name);
    return (name as string) || prevState;
  };

  const [data, formActionWithState] = useFormState(formAction, null);

  console.log("data", data);

  return (
    <div>
      <form action={formActionWithState}>
        <input type="text" name="name" />
        <Submit />
      </form>
    </div>
  );
}
