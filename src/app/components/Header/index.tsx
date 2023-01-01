import { Scroll, Timer } from 'phosphor-react';
import { NavLink } from 'react-router-dom';
import { HeaderContainer } from './styles';
import logoIgnite from '../../../assets/ignite-logo.svg';

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" height={24} />

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
