import React from 'react';
import {Link} from 'react-router-dom';

class Footer extends React.Component {

    render() {
        return(
            <div id="footer" className="footer-container">
                <div className="agreements">
                    <Link to="/user_agreement">Користувацька угода</Link>
                    <Link to="/personal_data_processing">Згода на обробку персональних даних</Link>
                </div>
                <div className="contacts">
                    <span>Контакти:</span>
                    <span>
                        eMail: aeronavua@gmail.com
                    </span>
                    <span>
                        тел: +38-032-297-21-16
                    </span>
                </div>
                <div className="copyright" >Copyright © {new Date().getFullYear()} All rights reserved</div>
            </div>
        );
    }
}
export default Footer;
