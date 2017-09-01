define([
    'Application',
    'react'
], function(
    Application,
    React
) {

    return  GridComponent = React.createClass({
        getInitialState: function() {

            return {
                disabled: false
            };
        },
        
        _bindEvents: function() {
        },
        
        _onGridDisable: function(state) {
            this.setState({
                disabled: state
            });
        },

        componentDidMount: function() {
        },

        render: function() {

            return (
                <div className="settings-userlist">
                    <div className="userlist-table-container">
                        <table className="settings-userlist-table" cellPadding="0" cellSpacing="0">
                            <thead>
                                <tr>
                                    <td className="checkbox-cell">
                                        <input type="checkbox" className="delete-checkbox all-checkbox" />
                                    </td>
                                    <td className="login-cell">Логин пользователя</td>
                                    <td className="name-cell">Имя</td>
                                    <td className="switch-cell">Вкл.</td>
                                    <td className="controls-cell">&nbsp;</td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            );
        }
  });

  return GridComponent;
});
