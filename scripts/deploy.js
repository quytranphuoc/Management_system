async function main() {
  const StudentRecord = await ethers.getContractFactory("StudentRecord");
  const studentRecord = await StudentRecord.deploy(); // deploy

  await studentRecord.waitForDeployment(); // ⭐ chờ deploy thành công

  console.log(`StudentRecord deployed to: ${studentRecord.target}`); // ethers v6 dùng .target thay vì .address
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
