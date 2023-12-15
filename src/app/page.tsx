import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc';

import MainComponent from '@/components/main-component'

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(utc)

export default function Home() {
  return (
    <div className="h-full">
      <MainComponent />
    </div>
  )
}
