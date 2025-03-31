import type { Route } from './+types/home';
import { Transactions } from '../transactions';

export function meta() {
  return [{ title: 'Heard Transactions Take Home App' }];
}

export default function Home() {
  return <Transactions />;
}
