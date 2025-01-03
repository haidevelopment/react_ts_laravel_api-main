import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Loading.module.scss';
import classNames from 'classnames/bind';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Loading = () => {
  return (
    <div className={cx("loading-wrapper")}>
      <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
    </div>
  );
};

export default Loading;
