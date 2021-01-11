import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import s from './Loader.module.css';

export default function Loading() {
  return (
    <div className={s.loader}>
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={120}
        width={120}
        className={s.loader}
      />
    </div>
  );
}
