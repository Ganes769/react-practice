import type { User } from "../App";
type OnlineProps = { data: User[] };
export default function Online({ data }: OnlineProps) {
  console.log(typeof data);
  return (
    <div>
      {data.map((item: User) => (
        <div>
          {item.isOnline ? (
            <div key={item.name}>
              <div>{item.name}</div>
              <div>status:Online</div>
              <button>Send Message</button>
            </div>
          ) : (
            <div>offline</div>
          )}
        </div>
      ))}
    </div>
  );
}
