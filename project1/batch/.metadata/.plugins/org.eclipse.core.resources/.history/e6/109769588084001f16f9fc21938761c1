package com.ss.batch.repository;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import com.ss.batch.entity.PackageEntity;

@SpringBootTest
public class PackageRepositoryTest {
	@Autowired
	private PackageRepository repo;

	@Test // Junit 이미 스프링 부트에서 제공을 하는 라이브러리
	public void test_save() {
		// given : 테스트를 위한 초기 데이터 설정
		PackageEntity entity = new PackageEntity();
		entity.setPackageName("바디 챌린지 pt 12주");
		entity.setPeriod(84);

		// when : 실제로 테스트할 작업 수행(데이터베이스 저장)
		repo.save(entity);

		// then : 예상 결과를 검증(ID가 자동으로 생성)
		// 아이디가 자동으로 들어가면 null이 아닌걸 확인
		assertNotNull(entity.getPackSeq());
	}
	
	@Test
	public void test_findByCreate () {
		// 현재 시간에서 1분 전 시간의 패키지 가져오기
		LocalDateTime dateTime = LocalDateTime.now().minusMinutes(1);
		
		PackageEntity pack1 = new PackageEntity();
		pack1.setPackageName("학생 전용 3개월");
		pack1.setPeriod(90);
		repo.save(pack1);
		
		PackageEntity pack2 = new PackageEntity();
		pack2.setPackageName("학생 전용 6개월");
		pack2.setPeriod(90);
		repo.save(pack2);
		
		// when : 특정 시간 이후에 생성된 패키지를 페이징 및 정렬 조건에 맞춰서 조회
		// 최신 패키지를 조회(내림차순)
		PageRequest page = PageRequest.of(0, 1, Sort.by("pack_seq").descending());
		List<PackageEntity> result = repo.findByCreatedAtAfter(dateTime, page);
		
		// then : 결과 검증
		System.out.println("사이즈 반환: " + result.size());
		assertEquals(1, result.size());
		
		// 시퀀스 아이디를 기준으로 조회도 가능하다.
		assertEquals(pack2.getPackSeq(), result.get(0).getPackSeq());
	}

}
