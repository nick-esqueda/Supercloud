import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './SplashPage.css';

export default function SplashPage() {
  const history = useHistory();
  const user = useSelector(state => state.session.user);

  // if (user) history.push('/');
  
  return (
    <div>SplashPage</div>
  )
}
