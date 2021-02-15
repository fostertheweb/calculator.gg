const fastify = require("fastify")({
	logger: true,
});

const fs = require("fs");

fastify.get("/champions", function (request, reply) {
	const champs = "../data/11.3.1/data/en_US/champion.json";

	fs.readFile(champs, "utf8", (err, data) => {
		if (err) {
			throw err;
		}

		reply.send(JSON.parse(data).data);
	});
});

fastify.get("/champions/:id", function (request, reply) {
	const champions = "../data/11.3.1/data/en_US/champion";
	const id = request.params.id;

	fs.readFile(`${champions}/${id}.json`, "utf8", function (err, data) {
		if (err) {
			throw err;
		}

		reply.send(JSON.parse(data).data);
	});
});

// Run the server!
fastify.listen(3000, function (err, address) {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
	fastify.log.info(`server listening on ${address}`);
});
