package org.jhipster.health.web.rest;

import org.jhipster.health.Application;
import org.jhipster.health.domain.Bloodpressure;
import org.jhipster.health.repository.BloodpressureRepository;
import org.jhipster.health.repository.search.BloodpressureSearchRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the BloodpressureResource REST controller.
 *
 * @see BloodpressureResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class BloodpressureResourceIntTest {


    private static final LocalDate DEFAULT_TIMESTAMP = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TIMESTAMP = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_SYSTOLIC = 1;
    private static final Integer UPDATED_SYSTOLIC = 2;

    private static final Integer DEFAULT_DIASTOLIC = 1;
    private static final Integer UPDATED_DIASTOLIC = 2;

    @Inject
    private BloodpressureRepository bloodpressureRepository;

    @Inject
    private BloodpressureSearchRepository bloodpressureSearchRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restBloodpressureMockMvc;

    private Bloodpressure bloodpressure;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        BloodpressureResource bloodpressureResource = new BloodpressureResource();
        ReflectionTestUtils.setField(bloodpressureResource, "bloodpressureRepository", bloodpressureRepository);
        ReflectionTestUtils.setField(bloodpressureResource, "bloodpressureSearchRepository", bloodpressureSearchRepository);
        this.restBloodpressureMockMvc = MockMvcBuilders.standaloneSetup(bloodpressureResource)
                .setCustomArgumentResolvers(pageableArgumentResolver)
                .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        bloodpressure = new Bloodpressure();
        bloodpressure.setTimestamp(DEFAULT_TIMESTAMP);
        bloodpressure.setSystolic(DEFAULT_SYSTOLIC);
        bloodpressure.setDiastolic(DEFAULT_DIASTOLIC);
    }

    @Test
    @Transactional
    public void createBloodpressure() throws Exception {
        int databaseSizeBeforeCreate = bloodpressureRepository.findAll().size();

        // Create the Bloodpressure

        restBloodpressureMockMvc.perform(post("/api/bloodpressures")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(bloodpressure)))
                .andExpect(status().isCreated());

        // Validate the Bloodpressure in the database
        List<Bloodpressure> bloodpressures = bloodpressureRepository.findAll();
        assertThat(bloodpressures).hasSize(databaseSizeBeforeCreate + 1);
        Bloodpressure testBloodpressure = bloodpressures.get(bloodpressures.size() - 1);
        assertThat(testBloodpressure.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testBloodpressure.getSystolic()).isEqualTo(DEFAULT_SYSTOLIC);
        assertThat(testBloodpressure.getDiastolic()).isEqualTo(DEFAULT_DIASTOLIC);
    }

    @Test
    @Transactional
    public void checkTimestampIsRequired() throws Exception {
        int databaseSizeBeforeTest = bloodpressureRepository.findAll().size();
        // set the field null
        bloodpressure.setTimestamp(null);

        // Create the Bloodpressure, which fails.

        restBloodpressureMockMvc.perform(post("/api/bloodpressures")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(bloodpressure)))
                .andExpect(status().isBadRequest());

        List<Bloodpressure> bloodpressures = bloodpressureRepository.findAll();
        assertThat(bloodpressures).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSystolicIsRequired() throws Exception {
        int databaseSizeBeforeTest = bloodpressureRepository.findAll().size();
        // set the field null
        bloodpressure.setSystolic(null);

        // Create the Bloodpressure, which fails.

        restBloodpressureMockMvc.perform(post("/api/bloodpressures")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(bloodpressure)))
                .andExpect(status().isBadRequest());

        List<Bloodpressure> bloodpressures = bloodpressureRepository.findAll();
        assertThat(bloodpressures).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDiastolicIsRequired() throws Exception {
        int databaseSizeBeforeTest = bloodpressureRepository.findAll().size();
        // set the field null
        bloodpressure.setDiastolic(null);

        // Create the Bloodpressure, which fails.

        restBloodpressureMockMvc.perform(post("/api/bloodpressures")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(bloodpressure)))
                .andExpect(status().isBadRequest());

        List<Bloodpressure> bloodpressures = bloodpressureRepository.findAll();
        assertThat(bloodpressures).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBloodpressures() throws Exception {
        // Initialize the database
        bloodpressureRepository.saveAndFlush(bloodpressure);

        // Get all the bloodpressures
        restBloodpressureMockMvc.perform(get("/api/bloodpressures"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(bloodpressure.getId().intValue())))
                .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())))
                .andExpect(jsonPath("$.[*].systolic").value(hasItem(DEFAULT_SYSTOLIC)))
                .andExpect(jsonPath("$.[*].diastolic").value(hasItem(DEFAULT_DIASTOLIC)));
    }

    @Test
    @Transactional
    public void getBloodpressure() throws Exception {
        // Initialize the database
        bloodpressureRepository.saveAndFlush(bloodpressure);

        // Get the bloodpressure
        restBloodpressureMockMvc.perform(get("/api/bloodpressures/{id}", bloodpressure.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(bloodpressure.getId().intValue()))
                .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()))
                .andExpect(jsonPath("$.systolic").value(DEFAULT_SYSTOLIC))
                .andExpect(jsonPath("$.diastolic").value(DEFAULT_DIASTOLIC));
    }

    @Test
    @Transactional
    public void getNonExistingBloodpressure() throws Exception {
        // Get the bloodpressure
        restBloodpressureMockMvc.perform(get("/api/bloodpressures/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBloodpressure() throws Exception {
        // Initialize the database
        bloodpressureRepository.saveAndFlush(bloodpressure);

        int databaseSizeBeforeUpdate = bloodpressureRepository.findAll().size();

        // Update the bloodpressure
        bloodpressure.setTimestamp(UPDATED_TIMESTAMP);
        bloodpressure.setSystolic(UPDATED_SYSTOLIC);
        bloodpressure.setDiastolic(UPDATED_DIASTOLIC);

        restBloodpressureMockMvc.perform(put("/api/bloodpressures")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(bloodpressure)))
                .andExpect(status().isOk());

        // Validate the Bloodpressure in the database
        List<Bloodpressure> bloodpressures = bloodpressureRepository.findAll();
        assertThat(bloodpressures).hasSize(databaseSizeBeforeUpdate);
        Bloodpressure testBloodpressure = bloodpressures.get(bloodpressures.size() - 1);
        assertThat(testBloodpressure.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testBloodpressure.getSystolic()).isEqualTo(UPDATED_SYSTOLIC);
        assertThat(testBloodpressure.getDiastolic()).isEqualTo(UPDATED_DIASTOLIC);
    }

    @Test
    @Transactional
    public void deleteBloodpressure() throws Exception {
        // Initialize the database
        bloodpressureRepository.saveAndFlush(bloodpressure);

        int databaseSizeBeforeDelete = bloodpressureRepository.findAll().size();

        // Get the bloodpressure
        restBloodpressureMockMvc.perform(delete("/api/bloodpressures/{id}", bloodpressure.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Bloodpressure> bloodpressures = bloodpressureRepository.findAll();
        assertThat(bloodpressures).hasSize(databaseSizeBeforeDelete - 1);
    }
}
