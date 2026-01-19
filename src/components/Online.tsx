export type User = {
  name: string;
  isOnline: boolean;
};
type OnlineProps = { data: User[] };
export default function Online({ data }: OnlineProps) {
  console.log(typeof data);
  return (
    <div>
      {data.map((item: User) => (
        <div key={item.name}>
          {item.isOnline ? (
            <div>
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
