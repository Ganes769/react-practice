import { useOptimistic, useState } from "react";

type Message = { text: string; sending: boolean; key: number };

const Optimistic = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hey, I am initial!", sending: false, key: 1 },
  ]);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state: Message[], newMessage: string) => [
      ...state,
      {
        text: newMessage,
        sending: true,
        key: Date.now(),
      },
    ],
  );

  async function sendFormData(formData: FormData) {
    const sentMessage = await fakeDelayAction(
      String(formData.get("username") ?? ""),
    );
    setMessages((prev) => [
      ...prev,
      { text: sentMessage, sending: false, key: Date.now() },
    ]);
  }

  async function fakeDelayAction(message: string) {
    await new Promise((res) => setTimeout(res, 1000));
    return message;
  }

  const submitData = async (userData: FormData) => {
    addOptimisticMessage(String(userData.get("username") ?? ""));

    await sendFormData(userData);
  };

  return (
    <>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={submitData}>
        <h1>OptimisticState Hook</h1>
        <div>
          <label>Username</label>
          <input type="text" name="username" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Optimistic;
