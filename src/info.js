function Info() {
	this.lu = EL('last-updated');
	this.lu_time = 0;
	var self = this, cache_manifest = document.body.parentNode.getAttribute('manifest');
	if (this.lu && cache_manifest && (location.protocol == 'http:')) {
		var x = new XMLHttpRequest();
		x.onload = function() {
			self.lu_time = new Date(this.getResponseHeader("Last-Modified"));
			self.show_updated();
		};
		x.open('GET', cache_manifest, true);
		x.send();
	}
}

Info.prototype.show_updated = function() {
	if (!this.lu || !this.lu_time) return;
	var span = this.lu.getElementsByTagName('span')[0];
	span.textContent = pretty_time_diff(this.lu_time);
	span.title = this.lu_time.toLocaleString();
	span.onclick = function(ev) {
		var self = (ev || window.event).target;
		var tmp = self.title;
		self.title = self.textContent;
		self.textContent = tmp;
	};
	this.lu.style.display = 'inline';
}

Info.prototype.show = function() {
	ko.set_view("info");
	EL("prog_ls").innerHTML = "";
	this.show_updated();
}
