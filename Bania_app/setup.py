from setuptools import setup, find_packages

with open("requirements.txt") as f:
    install_requires = f.read().strip().split("\n")

from bania import __version__ as version

setup(
    name="bania",
    version=version,
    description="Microservicio Universal de IA",
    author="BaniaIA",
    author_email="sistemas@banpa.com",
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=install_requires
)
