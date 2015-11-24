package org.jhipster.health.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.health.domain.Bloodpressure;
import org.jhipster.health.repository.BloodpressureRepository;
import org.jhipster.health.repository.search.BloodpressureSearchRepository;
import org.jhipster.health.web.rest.util.HeaderUtil;
import org.jhipster.health.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

/**
 * REST controller for managing Bloodpressure.
 */
@RestController
@RequestMapping("/api")
public class BloodpressureResource {

    private final Logger log = LoggerFactory.getLogger(BloodpressureResource.class);

    @Inject
    private BloodpressureRepository bloodpressureRepository;

    @Inject
    private BloodpressureSearchRepository bloodpressureSearchRepository;

    /**
     * POST  /bloodpressures -> Create a new bloodpressure.
     */
    @RequestMapping(value = "/bloodpressures",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Bloodpressure> createBloodpressure(@Valid @RequestBody Bloodpressure bloodpressure) throws URISyntaxException {
        log.debug("REST request to save Bloodpressure : {}", bloodpressure);
        if (bloodpressure.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new bloodpressure cannot already have an ID").body(null);
        }
        Bloodpressure result = bloodpressureRepository.save(bloodpressure);
        bloodpressureSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/bloodpressures/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert("bloodpressure", result.getId().toString()))
                .body(result);
    }

    /**
     * PUT  /bloodpressures -> Updates an existing bloodpressure.
     */
    @RequestMapping(value = "/bloodpressures",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Bloodpressure> updateBloodpressure(@Valid @RequestBody Bloodpressure bloodpressure) throws URISyntaxException {
        log.debug("REST request to update Bloodpressure : {}", bloodpressure);
        if (bloodpressure.getId() == null) {
            return createBloodpressure(bloodpressure);
        }
        Bloodpressure result = bloodpressureRepository.save(bloodpressure);
        bloodpressureSearchRepository.save(bloodpressure);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert("bloodpressure", bloodpressure.getId().toString()))
                .body(result);
    }

    /**
     * GET  /bloodpressures -> get all the bloodpressures.
     */
    @RequestMapping(value = "/bloodpressures",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Bloodpressure>> getAllBloodpressures(Pageable pageable)
            throws URISyntaxException {
        Page<Bloodpressure> page = bloodpressureRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/bloodpressures");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /bloodpressures/:id -> get the "id" bloodpressure.
     */
    @RequestMapping(value = "/bloodpressures/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Bloodpressure> getBloodpressure(@PathVariable Long id) {
        log.debug("REST request to get Bloodpressure : {}", id);
        return Optional.ofNullable(bloodpressureRepository.findOne(id))
                .map(bloodpressure -> new ResponseEntity<>(
                        bloodpressure,
                        HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /bloodpressures/:id -> delete the "id" bloodpressure.
     */
    @RequestMapping(value = "/bloodpressures/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteBloodpressure(@PathVariable Long id) {
        log.debug("REST request to delete Bloodpressure : {}", id);
        bloodpressureRepository.delete(id);
        bloodpressureSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("bloodpressure", id.toString())).build();
    }

    /**
     * SEARCH  /_search/bloodpressures/:query -> search for the bloodpressure corresponding
     * to the query.
     */
    @RequestMapping(value = "/_search/bloodpressures/{query}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Bloodpressure> searchBloodpressures(@PathVariable String query) {
        return StreamSupport
                .stream(bloodpressureSearchRepository.search(queryStringQuery(query)).spliterator(), false)
                .collect(Collectors.toList());
    }
}
