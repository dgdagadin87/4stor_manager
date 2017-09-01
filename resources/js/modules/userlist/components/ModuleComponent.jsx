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
            return {};
        },

        componentDidMount: function() {
        },

        render: function() {
            return (
                <div className="userlist-container">
                    <Header/>
                    <Toolbar/>
                    <Grid
                        foo="bar"
                    />
                </div>
            );
        }
  });

  return ModuleComponent;
});
