define([
    'react',
    'jsx!./HeaderComponent',
    'jsx!./ToolbarComponent',
    'jsx!./GridComponent'
], function(
    React,
    Header,
    Toolbar,
    Grid
) {

    var ModuleComponent = React.createClass({
        getInitialState: function() {
            return {
                disabled: true,
                serverData: this.props.serverData
            };
        },

        componentDidMount: function() {
        },

        render: function() {
            
            var states = this.state || {};
            var serverData = states.serverData || {};
            var disabled = states.disabled || false;
            
            return (
                <div className="userlist-container">
                    <Header
                        disabled={disabled}
                    />
                    <Toolbar
                        disabled={disabled}
                    />
                    <Grid
                        disabled={disabled}
                        serverData={serverData} 
                    />
                </div>
            );
        }
  });

  return ModuleComponent;
});
