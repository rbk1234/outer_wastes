/*
 *
  *     Note: A "coordinate" is the pair: [row, col]
  * */

(function($) {
    'use strict';

    var MAP_DEFAULTS = {
        startingCoord: [0,0],
        playerCoord: null,
        $modal: null
    };
    var currentMapId = 1;

    var Map = function (dbKey, config) {
        this._init(dbKey, config);
    };

    Map.prototype = {
        _init: function (dbKey, config) {
            this.dbKey = dbKey;
            this.id = currentMapId++;
            $.extend(true, this, MAP_DEFAULTS, Game.Maps.Database[dbKey], config);

            this._initTiles();
            this._moveToTile(this._tileForCoord(this.startingCoord));
            this.exploreCurrentTile();
        },

        _initTiles: function() {
            var r, c, numRows, numCols;
            this.tiles = [];

            for (r = 0, numRows = this.tileKeys.length; r < numRows; r++) {
                this.tiles[r] = [];

                for (c = 0, numCols = this.tileKeys[r].length; c < numCols; c++) {
                    var tileDbKey = this.legend[this.tileKeys[r][c]];
                    this.tiles[r][c] = new Game.UI.Tile(tileDbKey, { coordinate: [r,c] });
                }
            }
        },

        _moveToTile: function(tile) {
            this.playerCoord = tile.coordinate;
            this._propagateVisbility();
            Game.BackgroundUI.drawBackground(tile.dbKey, 0);

            if (this.$modal) {
                this._refreshModal();
                Game.UnitEngine.loadTile(tile);
                this.$modal.foundation('close');
                Game.CombatUI.hideMiniMap();
            }
        },

        currentTile: function() {
            return this._tileForCoord(this.playerCoord);
        },
        exploreCurrentTile: function() {
            this.currentTile().explored = true;
            this._propagateVisbility();
            this._refreshModal();
        },
        openModal: function() {
            if (this.$modal) {
                this.$modal.foundation('open');
            }
        },
        loadTileDescription: function($description) {
            var tile = this.currentTile();

            var nameWithoutLines = tile.name.replace(/\n/g, ' ');

            $description.find('.tile-name')
                .removeClass()
                .addClass('tile-name')
                .addClass(tile.color)
                .html(nameWithoutLines);
        },

        _tileForCoord: function(coordinate) {
            return this.tiles[coordinate[0]][coordinate[1]];
        },

        loadMiniMapHtml: function($map) {
            var adjacentTiles = this._adjacentTiles(this.playerCoord[0], this.playerCoord[1]);

            setupMiniMapTile($map.find('.north-button'), adjacentTiles.north);
            setupMiniMapTile($map.find('.east-button'), adjacentTiles.east);
            setupMiniMapTile($map.find('.south-button'), adjacentTiles.south);
            setupMiniMapTile($map.find('.west-button'), adjacentTiles.west);

            var currentTile = this.currentTile();
            $map.find('.current-tile').removeClass().addClass('current-tile tile-name').addClass(currentTile.color).html(currentTile.name);

            function setupMiniMapTile($button, tile) {
                if (tile) {
                    $button
                        .data('tile', tile);

                    $button.closest('div').removeClass('invisible');

                    $button.find('.tile-name')
                        .removeClass()
                        .addClass('tile-name')
                        .addClass(tile.color)
                        .html(tile.name);
                }
                else {
                    $button.closest('div').addClass('invisible');
                }
            }

            this._initEventHandlers($map);
        },

        loadModalHtml: function($modal) {
            this.$modal = $modal;
            this._propagateVisbility();
            this._refreshModal();
            $modal.find('.map-name').html(this.name);
        },

        _refreshModal: function() {
            if (this.$modal) {
                this._loadHtml(this.$modal.find('.ascii-content'), this.tiles);
            }
        },

        _loadHtml: function($target, tiles) {
            var r, c, numRows, numCols, isCurrentLocation;

            var $table = $('<table/>').addClass('map-table');
            for (r = 0, numRows = tiles.length; r < numRows; r++) {
                var $tr = $('<tr/>');
                for (c = 0, numCols = tiles[r].length; c < numCols; c++) {
                    var tile = tiles[r][c];
                    isCurrentLocation = Game.Util.arraysEqual(tile.coordinate, this.playerCoord);

                    var tdPadding = (1 / numCols / 2 * 100) + '%'; // Set td padding to make square cells. (/2) since half on top half on bottom.
                    var $td = $('<td/>')
                        .data('tile', tile)
                        .css('padding-top', tdPadding)
                        .css('padding-bottom', tdPadding)
                        .addClass('move-on-click')
                        .toggleClass('explored', tile.explored)
                        .toggleClass('visible', tile.visible)
                        .toggleClass('current-location', isCurrentLocation)
                        .toggleClass('travelable', tile.travelable);

                    var tileName = tile.name;
                    var numLines = (tileName.match(/\n/g) || []).length + 1;
                    var $name = $('<span/>')
                        .removeClass()
                        .addClass('tile-name')
                        .addClass('num-lines-'+numLines)
                        .addClass(tile.color)
                        .html(tileName);
                    $td.append($name);

                    var travelDesc = tile.travelable ? '' : 'Too Far';
                    if (isCurrentLocation) {
                        travelDesc = '';
                    }
                    var $travelDesc = $('<span/>')
                        .addClass('travel-desc')
                        .html(travelDesc);
                    $td.append($travelDesc);

                    $tr.append($td);
                }
                $table.append($tr);
            }

            $target.empty().append($table);
            this._initEventHandlers($table);
        },

        _initEventHandlers: function($map) {
            var self = this;

            $map.off('click', '.move-on-click').on('click', '.move-on-click', function() {
                var tile = $(this).data('tile');
                if (tile.travelable) {
                    self._moveToTile(tile);
                }
            });
        },


        _propagateVisbility: function() {
            var r, c, numRows, numCols, tile, isCurrentLocation;

            // Reset internal attributes
            for (r = 0, numRows = this.tiles.length; r < numRows; r++) {
                for (c = 0, numCols = this.tiles[r].length; c < numCols; c++) {
                    tile = this.tiles[r][c];
                    tile.visible = false;
                    tile.travelable = false;
                }
            }

            // Update internal attributes
            for (r = 0, numRows = this.tiles.length; r < numRows; r++) {
                for (c = 0, numCols = this.tiles[r].length; c < numCols; c++) {
                    tile = this.tiles[r][c];
                    isCurrentLocation = Game.Util.arraysEqual(tile.coordinate, this.playerCoord);

                    // Set tiles visible if they are explored, or adjacent to an explored tile
                    tile.visible = tile.explored;
                    Object.values(this._adjacentTiles(r, c)).forEach(function(adjacentTile) {
                        if (adjacentTile.explored) {
                            tile.visible = true;
                        }
                        if (isCurrentLocation) {
                            adjacentTile.travelable = true;
                        }
                    });
                }
            }
        },
        

        _adjacentTiles: function(r, c) {
            var adjacentTiles = {};

            if (this.tiles[r][c - 1]) {
                adjacentTiles.west = this.tiles[r][c - 1];
            }
            if (this.tiles[r][c + 1]) {
                adjacentTiles.east = this.tiles[r][c + 1];
            }
            if (this.tiles[r - 1] && this.tiles[r - 1][c]) {
                adjacentTiles.north = this.tiles[r - 1][c];
            }
            if (this.tiles[r + 1] && this.tiles[r + 1][c]) {
                adjacentTiles.south = this.tiles[r + 1][c];
            }
            return adjacentTiles;
        }

    };

    Game.namespace('UI').Map = Map;


    var TILE_DEFAULTS = {
        explored: true,
        visible: false,
        travelable: false,
        encounters: []
    };
    var currentTileId = 1;

    var Tile = function (dbKey, config) {
        this._init(dbKey, config);
    };
    Tile.prototype = {
        _init: function (dbKey, config) {
            this.dbKey = dbKey;
            this.id = currentTileId++;
            $.extend(true, this, TILE_DEFAULTS, Game.Maps.Tiles[dbKey], config);
        }
    };

    Game.namespace('UI').Tile = Tile;


}(jQuery));
