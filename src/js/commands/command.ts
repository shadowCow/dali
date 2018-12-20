interface Command<T> {
  name: string;
  params: T;
}

export default Command