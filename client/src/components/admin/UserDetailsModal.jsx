import React from 'react'

import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

export const UserDetailsModal = ({user}) => {
    return (
        <div className="modal fade" id={`userModal${user.id}`} role="dialog">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
                <h3 className="mb-4">{user.firstName + ' ' + user.lastName}</h3>
                <p className="mt-4">Email: <a href={`mailto:${user.email}`}>{user.email}</a></p>
                <p>Dirección: {user.address}</p>
                <p>Teléfono: {user.phone}</p>
                <p>Fecha de nacimiento: {moment(user.birthday).format('l')}</p>
                <a href={user.linkedin}>Linkedin</a>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
}



export default UserDetailsModal
