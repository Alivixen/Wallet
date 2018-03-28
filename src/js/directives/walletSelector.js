'use strict';

angular.module('copayApp.directives')
  .directive('walletSelector', function($rootScope, $timeout, configService) {
    return {
      restrict: 'E',
      templateUrl: 'views/includes/walletSelector.html',
      transclude: true,
      scope: {
        title: '=walletSelectorTitle',
        show: '=walletSelectorShow',
        wallets: '=walletSelectorWallets',
        selectedWallet: '=walletSelectorSelectedWallet',
        onSelect: '=walletSelectorOnSelect',
        alwaysDisplayBitcoinCore: '=walletSelectorAlwaysDisplayBitcoinCore'
      },
      link: function(scope, element, attrs) {
        scope.displayWallet = true;
        scope.hide = function() {
          scope.show = false;
        };
        scope.selectWallet = function(wallet) {
          $timeout(function() {
            scope.hide();
          }, 100);
          scope.onSelect(wallet);
        };
        scope.$watch('wallets', function(newValue, oldValue) {
          scope.wallets = newValue;
        });
        scope.initDisplayBitcoinCoreConfig = function() {
          configService.whenAvailable(function(config) {
            scope.displayBitcoinCore = config.displayBitcoinCore.enabled;
            scope.initWalletDisplay();
          });
        };
        scope.initWalletDisplay = function() {
          scope.displayWallet = scope.alwaysDisplayBitcoinCore ? true : scope.displayBitcoinCore;
        };
        scope.initDisplayBitcoinCoreConfig();
        $rootScope.$on('Local/SettingsUpdated', function(e, walletId) {
          scope.initDisplayBitcoinCoreConfig();
        });
      }
    };
  });
