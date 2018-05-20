import unittest

from visualize import Visualizer

class VisualizeTest(unittest.TestCase):
	def setUp(self):
		self.data_file = "data/data.json"
		self.output_file = "output/output.png"
		self.data = { 1: 360,
        	3: 320,
        	4: 175,
        	6: 260,
        	8: 250,
        	10: 300
		}

		self._writeDataFile();
		self._deleteOutputFile()
		self.visualizer = Visualizer(self.data_file, self.output_file)

	def _writeDataFile(self):
		import json
		with open(self.data_file, 'w') as f:
			f.write(json.dumps(self.data))	

	def _deleteOutputFile(self):
		import os
		try:
			os.remove(self.output_file)
		except OSError:
			pass

	def test_load(self):
		self.visualizer.load()
		self.assertEqual(self.visualizer.data, self.data)

	def test_savefig(self):
		import os
		self.visualizer.savefig()
		assert os.path.exists(self.visualizer.opfile)
		assert os.path.getsize(self.visualizer.opfile)
			
