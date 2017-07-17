define([
    'react',
    'jsx!./HeaderComponent'
], function(
    React,
    Header
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
                </div>
            );
        }
  });

  return ModuleComponent;
});
