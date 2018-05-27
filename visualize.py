import matplotlib.pyplot as plt

class Visualizer:
	def __init__(self, datafile, opfile):
		self.datafile = datafile
		self.opfile = opfile
	
	def load(self):
		import json
		with open(self.datafile) as f:
			self.data = {int(k): int(v) for k, v in json.load(f).iteritems()}
			

	def _setPlot(self):
		items = sorted(self.data.items())
		cycles, time = zip(*items)
		self.fig, self.ax = plt.subplots()
		self.ax.plot(cycles, time)
		self.ax.set_title("Bill cycle vs runtime")	

	def savefig(self):
		try:
			self.fig.savefig(self.opfile)
		except AttributeError:
			self.load()
			self._setPlot()
			self.fig.savefig(self.opfile)

if __name__ == '__main__':
	v = Visualizer("data/billcycle_data.json", "output/output.png")
	v.load()
	v.savefig()
