define([
    'react'
], function(
    React
) {

    var HeaderComponent = React.createClass({
        getInitialState: function() {
            return {};
        },

        componentDidMount: function() {
        },

        render: function() {
            return (
                <div className="tabs">
                    <a href="#settings">Синхронизация</a>
                    <a href="#categorieslist">Категории</a>
                    <span>Пользователи</span>
                </div>
            );
        }
  });

  return HeaderComponent;
});
