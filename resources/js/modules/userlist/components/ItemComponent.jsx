define([
    'Application',
    'react'
], function(
    Application,
    React
) {

    var ItemComponent = React.createClass({
        getInitialState: function() {

            return {
                disabled: this.props.disabled || false,
                itemData: this.props.itemData || {}
            };
        },

        componentDidMount: function() {
        },
        
        componentWillReceiveProps: function(nextProps) {

            this.setState({
                disabled: nextProps.disabled || false,
                itemData: nextProps.itemData || {}
            });
        },
        
        render: function() {
           
           var disabled = this.state.disabled;
           var itemData = this.state.itemData;
           
            return (
                <tr className="grid-row">
                    <td className="checkbox-item-cell">
                        <input type="checkbox" class="delete-checkbox" />
                    </td>
                    <td className="name-item-cell">{itemData.login}</td>
                    <td className="name-item-cell">{itemData.name}</td>
                    <td className="multi-item-cell">
                        <div title={'Пользователь ' + (itemData.userIsOn === true ? 'включен' : 'отключен')} className={'radio-class ' + (itemData.userIsOn === true ? 'yes' : 'no')}></div>
                    </td>
                    <td className="controls-item-cell">
                        <a className={'edit-button grid-for-disabled' + (disabled ? ' grid-disabled' : '')} href="#" title="Редактировать пользователя">Ред.</a>
                        <a className={'delete-button grid-for-disabled' + (disabled ? ' grid-disabled' : '')} href="#" title="Удалить пользователя">Удл.</a>
                    </td>
                </tr>
            );
        }
  });

  return ItemComponent;
});
